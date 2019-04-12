import React, { Component } from 'react';
import '../../styles/sidebar.component.scss';
import home from '../../assets/home-icon.png';


export default class Sidebar extends Component {
    public render() {
        return (
            <div className='sidebar'>
                <div className='sidebar-title'>DigitalCommons.IO</div>
                <div className='sidebar-items'>
                    <div className='sidebar-item selected'>
                        <div className='sidebar-item-selection'></div>
                        <img className='sidebar-item-icon' src={home} />
                        <div className='sidebar-item-name'>Home</div>
                    </div>
                </div>
            </div>
        );
    }
}