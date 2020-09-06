import React, { useState, useEffect } from 'react';
import './home.less';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import config from 'config';
import to from 'await-to-js'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap'
import logo from '../Images/logo.png'
import next from '../Images/next.svg'
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

function Home(props) {
    const [postings, setPostings] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        let [error, response] = await to(fetch(`/api/jobs`))
        console.log(response)
        let [err, feeds] = await to(response.json())
        setPostings(Array.from(feeds))
    }

    const clickHandler = (e) => {
        let element = e.currentTarget;
        postings.filter(x => {
            if (x.id == element.id)
                setSelectedPost(x)
        })
    }

    return (
        <div className="wrapper">
            <div className="nav">
                <img src={logo}></img>
            </div>
            <div className="contentWrapper">
                <div className="leftContent">
                    {
                        postings && postings.map(post => {
                            return (
                                <div className="cards" key={post.id} onClick={clickHandler} id={post.id}>
                                    <div className="content">
                                        <p className="card-title">
                                            {post.title}
                                        </p>
                                        <p className="company">
                                            <a href={post.company_url} target="_blank">{post.company}</a>
                                        &nbsp; > &nbsp;
                                        <span className="card_type">{post.type}</span>
                                        &nbsp; > &nbsp;
                                        <span className="card_location">{post.location}</span>
                                        </p>
                                    </div>
                                    <div className="indicator">
                                        <img src={next}></img>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="rightContent">
                    {selectedPost ? (
                        <div>
                            <div className="contentBox">
                                <img src={selectedPost.company_logo}></img>
                                <div className="head">
                                    <p className="card-title">{selectedPost.title}</p>
                                    <div className="body">
                                        <p>
                                            Company : <a href={selectedPost.company_url}>{selectedPost.company}</a>
                                            &nbsp; | &nbsp;
                                            location: {selectedPost.location}
                                            &nbsp; | &nbsp;
                                            Type: {selectedPost.type}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="how_to" dangerouslySetInnerHTML={{
                                __html: selectedPost.how_to_apply
                            }}> </div> */}
                            <div className="description" dangerouslySetInnerHTML={{
                                __html: selectedPost.description
                            }}>
                            </div>
                            <h4>How to apply?</h4>
                            <span className="how_to" dangerouslySetInnerHTML={{
                                __html: selectedPost.how_to_apply
                            }}>
                            </span>

                        </div>
                    ) : (
                            <h2>Select a job to view...</h2>
                        )

                    }
                </div>
            </div>
        </div>
    );
}

export { Home };