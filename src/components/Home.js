import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from './Auth'

const Home = () => {
    const {currentUser} = useContext(AuthContext);

    return(
        <>
            <div className="container mt-5">
                <h1>Home</h1>
                {currentUser ? (
                    <p>You are logged in - <Link to="/shop">View Shop</Link></p>
                ) : (
                    <p>
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </p>
                )}
            </div>
        </>
    )
}

export default Home;