import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';


export default function CreatePost() {
  const { user } = useAuth();
    return (
        <div className="Container" style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignitems: 'flex-start',
                        padding: "32px 0px 32px 32px",
                        gap: "48px",
                        position: 'absolute',
                        width: "864px",
                        height: "780px",
                        left: 'calc(50% - 864/2)',
                        top: 'calc(50% - 780/2 + 17)',
                        background: "#EDEEF1", 
                        borderRadius: 14,}}>
            <h1 style={{}}>Create A New Post</h1>
            <h2>What would you like to share?</h2>
            <button>Ask a Question</button>
            <button>Share a Tip</button>
        </div>
    );
}

