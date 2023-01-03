import React, { useEffect } from 'react';
import { Layout, ConfigProvider, Icon, theme } from 'fedx-ui';
import { ErrorBoundary } from 'oss-web-common';
import useLoginInfoModel, { useEnvironmentModel } from '@Src/hox';
import GlobalMessage from '@Src/common/global-message';
import shareActions from '@Src/share/actions';
import { useHistory } from 'react-router';
import routes, { mapRoutes, Switch } from './routes';
import { AliveScope } from 'react-activation';
import './styles/App.less';
const { Content } = Layout;
const { CURRENT_VERSION } = process.env;
const { useToken } = theme;

const customizeRenderEmpty = () => (
    //这里面就是我们自己定义的空状态
    <div className="fedx-container-empty">
        <Icon type="iconzanwushuju" style={{ fontSize: 60, marginBottom: 5 }} />
        <p style={{ fontSize: 18 }}>暂无数据</p>
    </div>
);
// const changeTheme = (theme) => {
//     const { actions, messageTypes } = shareActions;
//     actions && actions.postMessage && actions.postMessage(messageTypes.changeTheme, theme);
// };

function OssApp(props) {
    const { curRoute } = props;
    const { token } = useToken();

    const { environmentLoaded } = useEnvironmentModel();
    const login = useLoginInfoModel();
    const history = useHistory();

    useEffect(() => {
        if (curRoute) {
            history.push(curRoute);
        }
        if (login) {
            let isFirstChangeState = true;
            const {
                setUserName,
                setUserId,
                setUserInfo,
                setContainer,
                setSystemInfo,
                setUuIdValue,
                setSrcString,
                setMessageTypes,
                setColorPrimary,
            } = login;
            /**
             * 绑定监听函数，监听函数只有在数据变化时才会触发
             * dataListener: 绑定函数
             * autoTrigger: 在初次绑定监听函数时如果有缓存数据，是否需要主动触发一次，默认为false
             * !!!重要说明: 因为子应用是异步渲染的，而基座发送数据是同步的，
             * 如果在子应用渲染结束前基座应用发送数据，则在绑定监听函数前数据已经发送，在初始化后不会触发绑定函数，
             * 但这个数据会放入缓存中，此时可以设置autoTrigger为true主动触发一次监听函数来获取数据。
             */
            window?.microApp?.addDataListener((data) => {
                console.log('来自基座应用的数据111', data);

                const { systemInfo, userInfo, uuid, src, colorPrimary } = data || {};

                setUserName(userInfo?.userName);
                setUserId(userInfo?.userId);
                setUserInfo(userInfo && JSON.stringify(userInfo));
                // setContainer(props.container);
                setSystemInfo(systemInfo);
                setUuIdValue(uuid);
                setSrcString(src);
                setMessageTypes(systemInfo?.messageTypes);
                setColorPrimary(colorPrimary);
            }, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     let currentTheme = null;
    //     const { systemInfo } = login;
    //     GlobalMessage.off('activeChanged', null, null);
    //     GlobalMessage.on('activeChanged', ({ isActive }) => {
    //         if (isActive && currentTheme !== systemInfo?.theme) {
    //             changeTheme(systemInfo?.theme);
    //             currentTheme = systemInfo?.theme;
    //         }
    //     });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [login.systemInfo?.theme]);

    return (
        <ConfigProvider
            prefixCls="fedx-ui"
            theme={{
                token: {
                    colorPrimary: login?.colorPrimary || token.colorPrimary,
                },
            }}
            renderEmpty={customizeRenderEmpty}
        >
            <Layout className="fedx-layout">
                <Content className="fedx-layout-content">
                    <ErrorBoundary>
                        {environmentLoaded && (
                            <Switch>
                                <AliveScope>{mapRoutes(routes)}</AliveScope>
                            </Switch>
                        )}
                    </ErrorBoundary>
                </Content>
            </Layout>
        </ConfigProvider>
    );
}

export default OssApp;
