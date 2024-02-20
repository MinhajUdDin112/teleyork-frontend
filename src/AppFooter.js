import React from 'react';
import "./css/app_footer.css"
export const AppFooter = (props) => {

    return (
        <div className="  footer-main flex  flex-wrap flex-row justify-content-center " >  
           <h5>Powered By</h5>
         <div>
                <a href="https://teleyork.com" target="_blank" rel="noopener noreferrer">
                
                  <img src="/FooterLogo/CompanyLogo.png" alt='logo'/>
                </a> 
                 </div>
           
        </div>
    );
}
