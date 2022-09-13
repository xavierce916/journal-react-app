
import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from "./AuthRouter";
import { firebase } from '../firebase/firebase-config'
import { login } from "../actions/auth";
import { useDispatch } from "react-redux";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ cheking, setCheking ] = useState( true );
    const [ isLoggedIn, setIsLoggedIn ] = useState( false );

    useEffect(() => {

        firebase.auth().onAuthStateChanged( async (user) => {
            
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );

                dispatch( startLoadingNotes( user.uid ) );

            } else {
                setIsLoggedIn( false );
            }

            setCheking( false );
        });
        

    }, [ dispatch ]);
    
    if ( cheking ) {
        return <h1>Wait...</h1>
    }
    
    return (
        <Router>
            <div>
                <Switch> 
                    <PublicRoute 
                        path="/auth" 
                        component={ AuthRouter } 
                        isAuthenticated={ isLoggedIn }
                    />
                    
                    <PrivateRoute
                        exact 
                        path="/" 
                        component={ JournalScreen } 
                        isAuthenticated={ isLoggedIn }
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
};
