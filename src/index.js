/** * * * * * * * * * * * * * * * * * * * * * * **
 *                    _ooOoo_                    *
 *                   o8888888o                   *
 *                   88" . "88                   *
 *                   (| -_- |)                   *
 *                   O\  =  /O                   *
 *                ____/`---'\____                *
 *              .'  \\|     |//  `.              *
 *             /  \\|||  :  |||//  \             *
 *            /  _||||| -:- |||||-  \            *
 *            |   | \\\  -  /// |   |            *
 *            | \_|  ''\---/''  |   |            *
 *            \  .-\__  `-`  ___/-. /            *
 *          ___`. .'  /--.--\  `. . __           *
 *       ."" '<  `.___\_<|>_/___.'  >'"".        *
 *      | | :  `- \`.;`\ _ /`;.`/ - ` : | |      *
 *      \  \ `-.   \_ __\ /__ _/   .-` /  /      *
 * ======`-.____`-.___\_____/___.-`____.-'====== *
 *                    `=---='                    *
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ *
 *             佛祖保佑       永无BUG              *
 *         此代码经过开光处理，不可能存在bug！        *
 * * * * * * * * * * * * * * * * * * * * * * * **/

import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './App';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from 'oss-web-common';
import globalMessage from '@Src/common/global-message';
import constants from './common/constants';
import { Icon, ConfigProvider } from 'fedx-ui';
import actions from './share/actions';

const BASENAME = constants.BASE_NAME;
const containerStyle = { height: '100%' };
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_RENDER !== 'true') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackHooks: false,
    });
}

Icon.createFromIconfontCN({
    scriptUrl: `${constants.STATIC_PATH}/iconfont/iconfont.js`,
    prefixCls: '', // 或者 直接调用 Icon.prefixCls = 'xxx';
});

render({});

async function render(props) {
    let curRoute = '';
    if (window.__MICRO_APP_ENVIRONMENT__) {
        const data = window.microApp.getData();
        curRoute = data.curRoute;
    }

    const root = createRoot(document.querySelector('#root'));
    root.render(
        // <React.StrictMode>
        <div className="{{projectName}}" style={containerStyle}>
            {/* <LocaleProvider localePath={constants.LOCALES_PATH}> */}
            {window.__MICRO_APP_ENVIRONMENT__ ? (
                <MemoryRouter basename={window.__MICRO_APP_BASE_ROUTE__ || BASENAME}>
                    <App curRoute={curRoute.replace(BASENAME, '')} />
                </MemoryRouter>
            ) : (
                <BrowserRouter basename={BASENAME}>
                    <App container={Document.body} />
                </BrowserRouter>
            )}
            {/* </LocaleProvider> */}
        </div>,
        // </React.StrictMode>,
    );
}
