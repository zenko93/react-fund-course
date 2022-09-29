import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";

const Post = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading] = useFetching(async () => {
        const response = await PostService.getPostById(params.id);
        setPost(response.data)
    });
    const [fetchPostCommentsById, isLoadingComments] = useFetching(async () => {
        const response = await PostService.getCommentsById(params.id);
        setComments(response.data)
    });

    useEffect(() => {
        fetchPostById()
        fetchPostCommentsById()
    }, [])

    return (
        <div  style={{padding: '12px'}}>
            <h1>Post {params.id}</h1>
            {
                isLoading
                    ? <Loader />
                    : <div>{post.id}. {post.title}</div>
            }
            <h1  style={{padding: '12px 0'}}>Comments:</h1>
            {
                isLoadingComments
                    ? <Loader />
                    : <div>
                        {
                            comments.map(comment =>
                                <p key={comment.id}  style={{padding: '8px 0'}}>
                                    <h3>{comment.email}</h3>
                                    <span>{comment.body}</span>
                                </p>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default Post;