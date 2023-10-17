import React from 'react';

function Searchbar({ inputText, setInputText }) {
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <div className="searchbar-container">
            <div className="searchbar">
                <input
                    type="text"
                    onChange={inputHandler}
                    value={inputText}
                    style={{
                        width: '100%',
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        backgroundColor: '#FAF3EB',
                    }}
                    placeholder="Search"
                />
            </div>
        </div>
    );
}

export default Searchbar;
