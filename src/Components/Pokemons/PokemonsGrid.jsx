import React, { useState, useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'

const PokemonsGrid = forwardRef(function (props, ref) {
    const [rowData, setRowData] = useState();
    const navigate = useNavigate();
    const [gridApi, setGridApi] = useState();
    const [columnDefs,] = useState([
        { headerName: 'Name', field: 'name', filter: true },
    ]);
    const dispatch = useDispatch();

    // handle error
    function ErrorFallback({ error, resetErrorBoundary }) {
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    };

    // custom row styles
    const rowStyle = {
        textTransform: 'capitalize',
        fontSize: 'large',
        float: 'left'
    };

    // DefaultColDef sets props common to all Columns
    const defaultColDef = {
        sortable: true,
        // filter: true,
        pagination: true,
        floatingFilter: true,
        flex: 1
    };

    const navigateToDetails = (event) => {
        const filterModel = gridApi.getFilterModel();
        const pageNo = gridApi.paginationGetCurrentPage();
        dispatch({
            type: 'SAVE_PAGINATION_FILTER',
            payload: {
                filterModel: JSON.stringify(filterModel),
                pageNo: Number(pageNo)
            }
        })
        navigate(
            '/details',
            {
                state: {
                    data: event.data,
                    rowIndex: event.rowIndex
                }
            }
        )
    }
    useEffect(() => {
        if (gridApi && props.filterPagination) {
            if (props.filterPagination?.filterModel) {
                gridApi.setFilterModel(JSON.parse(props.filterPagination?.filterModel));
            }
            if (!JSON.parse(props.filterPagination?.filterModel) && props.filterPagination?.pageNo) {
                gridApi.paginationGoToPage(Number(props.filterPagination?.pageNo));
            }
        }
    }, [gridApi]);

    useImperativeHandle(ref, () => {
        return {
            getApi() {
                return gridApi;
            }
        }
    });
    useEffect(() => {
        setRowData(props.data)
    }, [props.data])

    const onGridReady = (params) => {
        setGridApi(params.api);
    }
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // reset the state of your app so the error doesn't happen again
            }}
        >
            <div className="ag-theme-alpine" data-testid='grid' style={{ width: 'auto', height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    pagination={true}
                    rowStyle={rowStyle}
                    paginationPageSize={10}
                    onRowClicked={navigateToDetails}
                    onGridReady={onGridReady}
                    // onCellClicked={cellClickedListener}
                    onCellKeyPress={navigateToDetails}
                    suppressHorizontalScroll={false}
                />
            </div>
        </ErrorBoundary>
    );
});

const mapSTateToProps = (state) => ({
    pokemons: state?.pokemons,
    filterPagination: state?.filterPagination
});

export default connect(mapSTateToProps)(PokemonsGrid)
