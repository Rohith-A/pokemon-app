import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getPokemons } from '../../State/Reducer/Actions';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/material';
import { Wrapper } from '../../StyledComponents/StyledComponents';
import { Box } from '@mui/system';
import PokemonsGrid from './PokemonsGrid';

const PokemonList = (props) => {

    const [limit, setLimit] = useState(localStorage.limit ? localStorage.limit : 20);
    const API_URL = 'https://pokeapi.co/api/v2/pokemon'

    const handleChange = (event) => {
        setLimit(event.target.value);
        localStorage.limit = event.target.value;
        fetch(`${API_URL}?limit=${event.target.value}&offset=10`).then(response => response.json())
            .then(payload => dispatch(getPokemons(payload)));
    };

    const dispatch = useDispatch();
    useEffect(() => {
        const lim = localStorage.limit ? localStorage.limit : 20;
        fetch(`${API_URL}?limit=${lim}&offset=10`).then(response => response.json())
            .then(payload => dispatch(getPokemons(payload)));
    }, []);

    return (
        <Container maxWidth="sm">
            <Wrapper>
                <div>
                    <Box
                        sx={{
                            width: 300,
                            height: 65
                        }}
                        mt={1}
                    >
                        <FormControl sx={{ m: 1, float: 'left', minWidth: 200 }} size="small" >
                            <InputLabel id="demo-select-small">Count</InputLabel>
                            <Select
                                data-testid='dropDOwn'
                                labelId="select-small"
                                id="select-small"
                                value={limit}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <PokemonsGrid data={props.pokemons?.results} />
            </Wrapper>
        </Container >

    );
}

const mapSTateToProps = (state) => ({
    pokemons: state?.pokemons
});

export default connect(mapSTateToProps)(PokemonList)