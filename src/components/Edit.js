import React, { Component } from 'react';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            description: '',
            author: '',
            rating: 0
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('samples').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    title: board.title,
                    description: board.description,
                    author: board.author,
                    rating: board.rating
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ board: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author, rating } = this.state;

        const updateRef = firebase.firestore().collection('samples').doc(this.state.key);
        updateRef.set({
            title,
            description,
            author,
            rating
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                description: '',
                author: '',
                rating: 0
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
    ratingChanged = (value) => {
        this.setState(prev => {
            return {
                ...prev,
                rating: value
            }
        })
    }
    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT BOOK
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">BOOK List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
                            </div>
                            <div class="form-group">
                                <label for="author">Rating:</label>
                                <ReactStars
                                    count={5}
                                    value={this.state.rating}
                                    onChange={this.ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </div>

                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;