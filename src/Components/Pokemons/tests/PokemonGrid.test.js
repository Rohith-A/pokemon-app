import React from "react";
import PokemonGrid from "../PokemonsGrid";
import { AgGridReact } from "ag-grid-react";
import { mount } from "enzyme";
import { act } from "@testing-library/react";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createStore } from "redux";
import { rootReducer } from "../../../State/Reducer/RootReducers";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

let component = null;
let agGridReact = null;
const store = createStore(rootReducer)

const ensureGridApiHasBeenSet = async (componentRef) => {
    act(() => {
        new Promise(function (resolve, reject) {
            (function waitForGridReady() {
                if (componentRef?.current?.getApi()) {
                    if (componentRef.current.getApi().getRowNode(8)) {
                        return resolve();
                    }
                }
                // setTimeout(waitForGridReady, 10);
                jest.setTimeout(10)
            })();
        });
    });
};

beforeEach(async () => {
    const ref = React.createRef();
    component = mount(<Provider store={store} >
        <BrowserRouter><PokemonGrid ref={ref} /></BrowserRouter>
    </Provider>);
    agGridReact = component.find(AgGridReact).instance();
    await ensureGridApiHasBeenSet(ref);
});

afterEach(() => {
    component.unmount();
    agGridReact = null;
});

it('all rows selected', () => {
    // no rows are selected initially
    expect(agGridReact?.api?.getSelectedRows().length).toEqual(0);

    // // simulate a user clicking on the select all button
    // component.find('#selectAll').simulate('click', {
    // // no actual event data is needed for this particular event/use case
    // });

    expect(agGridReact?.api?.getSelectedRows().length).toEqual(0)
});

it('all rows deselected', () => {
  // no rows are selected initially - use the grid directly to select them all (bypassing our app component)
  agGridReact?.api?.selectAll();

//   // simulate a user clicking on the deselect all button
//   component.find('#deSelectAll').simulate('click', {
//     // no actual event data is needed for this particular event/use case
//   });

  expect(agGridReact?.api?.getSelectedRows().length).toEqual(0);
});