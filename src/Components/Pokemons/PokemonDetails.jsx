import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getPokemonDetails, getPokemons } from '../../State/Reducer/Actions';
import { Card, CardActions, CardContent, CardHeader, CircularProgress, Container, Divider, IconButton, List, ListItem, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const PokemonDetails = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();
    const { data, rowIndex } = location?.state || {};
    const [index, setIndex] = useState(rowIndex);
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const API_URL = 'https://pokeapi.co/api/v2/pokemon'


    const getDetails = (url) => {
        setLoader(true);
        fetch(url).then(response => response.json())
            .then(payload => {
                dispatch(getPokemonDetails(payload))
                setLoader(false)
            });
    }

    useEffect(() => {
        fetch(`${API_URL}?limit=50&offset=10`).then(response => response.json())
            .then(payload => dispatch(getPokemons(payload)));
        if (data?.url) {
            getDetails(data.url)
        }
    }, [])

    const renderImg = () => {
        return (
            <img src={props.pokemonDetails?.sprites?.other?.dream_world?.front_default}
                height={200} width={250} alt="" className="img-responsive" />
        )
    }

    const nextPrev = (i) => {
        if (i >= 0 || i > props.pokemons?.results?.length - 1) {
            const pokemon = props.pokemons?.results[i];
            getDetails(pokemon.url);
        }
    }

    // custom styles for table cells
    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#cce6ff',
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    return (
        <Container maxWidth="sm">
            <div>
                <Box
                    sx={{
                        width: 400,
                        height: 75,
                        position: 'absolute'
                    }}
                    mt={5}
                    ml={15}
                >

                    <Card sx={{ maxWidth: 445 }} data-testid='card'>
                        <Divider />

                        <CardHeader
                            // action={
                            //     <Avatar sx={{ bgcolor: red[500] }} sizes={'small'}>
                            //         {props.pokemonDetails?.name ?
                            //             props.pokemonDetails?.name[0] : ''}
                            //     </Avatar>
                            // }
                            avatar={

                                <IconButton aria-label="back" onClick={() => navigate('/')}>
                                    <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '11px' }} fontSize={'small'} />
                                    <Typography sx={{ fontSize: '11px' }}>
                                        Back
                                    </Typography>
                                </IconButton>
                            }

                            title={
                                <Typography variant="h5" align='center' sx={{
                                    textTransform: 'capitalize',
                                    width: '175px'
                                }}>
                                    {!loader && props.pokemonDetails?.name}
                                </Typography>}
                        />
                        <Divider />

                        <CardActions>


                        </CardActions>
                        <CardContent>
                            {!loader ? (<>
                                {renderImg()}
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 10, pb: 1 }}>
                                    <IconButton aria-label="previous" onClick={() => {
                                        if (index > 0) {
                                            setIndex(index - 1)
                                        }
                                        nextPrev(index - 1)
                                    }}>
                                        {theme.direction === 'ltr' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                        <Typography variant="body2">
                                            Prev
                                        </Typography>
                                    </IconButton>
                                    <IconButton aria-label="play/pause">
                                    </IconButton>
                                    <IconButton aria-label="next" onClick={() => {
                                        if (index < props.pokemons?.results?.length - 1) {
                                            setIndex(index + 1)
                                        }
                                        nextPrev(index + 1)
                                    }}>
                                        <Typography variant="body2">
                                            Next
                                        </Typography>
                                        {theme.direction === 'ltr' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                    </IconButton>
                                </Box>
                                <Divider />
                                <Box sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                                    <nav aria-label="main mailbox folders">
                                        <List sx={{ display: 'flex' }}>
                                            <ListItem >
                                                <Typography align='center' sx={{
                                                    fontSize: '15px',
                                                    color: 'gray',
                                                    padding: '6px'
                                                }}>
                                                    Height :
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '15px',
                                                    color: 'black',
                                                    padding: '6px'
                                                }}>
                                                    {props.pokemonDetails?.height}
                                                </Typography>
                                            </ListItem>
                                            <ListItem >
                                                <Typography sx={{
                                                    fontSize: '15px',
                                                    color: 'gray',
                                                    padding: '6px'
                                                }}>
                                                    Weight :
                                                </Typography>
                                                <Typography sx={{
                                                    fontSize: '15px',
                                                    color: 'black',
                                                    padding: '6px'
                                                }}>
                                                    {props.pokemonDetails?.weight}
                                                </Typography>
                                            </ListItem>
                                        </List>
                                    </nav>
                                    <Divider />
                                    <nav aria-label="secondary mailbox folders">

                                        <List>
                                            <Typography sx={{
                                                fontSize: '15px',
                                                color: 'gray',
                                                marginRight: '55px'
                                            }}>
                                                Abilities
                                            </Typography>
                                            <ListItem>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 155 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Name</StyledTableCell>
                                                                <StyledTableCell align="right">Slot</StyledTableCell>
                                                                <StyledTableCell align="right">Hidden</StyledTableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {props.pokemonDetails?.abilities?.map((row) => (
                                                                <TableRow
                                                                    key={row.ability.name}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {row.ability.name}
                                                                    </TableCell>

                                                                    <TableCell align="right">{row.slot}</TableCell>
                                                                    <TableCell align="right">{row.is_hidden?.toString()}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </ListItem>
                                        </List>
                                    </nav>
                                </Box>
                            </>) : (<CircularProgress color='warning'/>
                            )}
                        </CardContent>

                    </Card>
                </Box>
            </div>
        </Container >
    );
}

const mapSTateToProps = (state) => ({
    pokemons: state?.pokemons,
    pokemonDetails: state?.pokemonDetails
});

export default connect(mapSTateToProps)(PokemonDetails)