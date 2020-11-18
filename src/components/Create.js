import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../firebase';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

class Create extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('samples');
        this.state = {
            title: '',
            description: '',
            author: '',
            rating: 0
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    ratingChanged = (val) => {
        this.setState(p => {
            return {
                ...p,
                rating: val
            }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author,
            rating } = this.state;

        this.ref.add({
            title,
            description,
            author,
            rating
        }).then((docRef) => {
            this.setState({
                title: '',
                description: '',
                author: '',
                rating: 0
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { title, description, author, rating } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            ADD BOOK
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
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

export default Create;
