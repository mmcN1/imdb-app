import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { img_500, REACT_APP_API_KEY, unavailable, unavailableLandscape } from '../../config/config';
import { Button } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import './ContentModal.css'
import Carousel from './Carousel/Carousel'




const ContentModal = ({ children, media_type, id }) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState()

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const fetchData = async () => {
        const D_API_URL = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${REACT_APP_API_KEY}&language=en-Us`

        await fetch(D_API_URL)
            .then((res) => res.json())
            .then((data) => {
                setContent(data);
            });
    }

    const fetchVideo = async () => {
        const V_API_URL = `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${REACT_APP_API_KEY}&language=en-US`

        await fetch(V_API_URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setVideo(data.results[0]?.key);
            });
    }
    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, [])

    return (
        < >
            <div type='button' onClick={handleOpen} className="media" color='inherit'>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                }}
                onClose={handleClose}
                closeAfterTransition
                slots={{ Backdrop }}
                slotProps={{
                    Backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    {content && (<div style={{
                        width: "90%",
                        height: "80%",
                        backgroundColor: "rgb(14, 14, 17)",
                        border: "2px solid white",
                        borderRadius: '10px',
                        color: "aliceblue",
                        boxShadow: 5,
                        paddingTop: 5,
                        paddingBottom: 20,
                        paddingRight: 5,
                        paddingLeft: 5,
                    }}>
                        <div className='ContentModal'>
                            <img
                                src={
                                    content.poster_path
                                        ? `${img_500}/${content.poster_path}`
                                        : unavailable
                                }
                                alt={content.name || content.title}
                                className="ContentModal__portrait"
                            />
                            <img
                                src={
                                    content.backdrop_path
                                        ? `${img_500}/${content.backdrop_path}`
                                        : unavailableLandscape
                                }
                                alt={content.name || content.title}
                                className="ContentModal__landscape"
                            />
                            <div className="ContentModal__about">
                                <span className="ContentModal__title">
                                    {content.name || content.title} (
                                    {(
                                        content.first_air_date ||
                                        content.release_date ||
                                        "-----"
                                    ).substring(0, 4)}
                                    )
                                </span>
                                {content.tagline && (
                                    <i className="tagline">{content.tagline}</i>
                                )}

                                <span className="ContentModal__description">
                                    {content.overview}
                                </span>

                                <div>
                                  <Carousel media_type={media_type} id={id} />
                                </div>
                                <Button
                                    variant='contained'
                                    startIcon={<YouTube />}
                                    color='secondary'
                                    target='_blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                >
                                    Watch Trailer
                                </Button>
                            </div>
                        </div>
                    </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}

export default ContentModal;