import React from 'react';

export const AppFooter = (props) => {

    return (
        <div className="text-center">
                <a href="https://teleyork.com" target="_blank" rel="noopener noreferrer">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/teleyork-logo.png' : 'assets/layout/images/teleyork-logo.png'} alt="Logo" height="20"  />
                </a>
           
        </div>
    );
}
