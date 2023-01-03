import { useState } from 'react';
import { createModel } from 'hox';
import { theme } from 'fedx-ui';
import { useEnvironment } from 'oss-web-common';
import constants from '../common/constants';

const { useToken } = theme;

function useLoginInfo() {
    const { token } = useToken();
    const [userName, setUserName] = useState('administrator');
    const [userId, setUserId] = useState('0');
    const [userInfo, setUserInfo] = useState('');
    const [container, setContainer] = useState('');
    const [systemInfo, setSystemInfo] = useState({ appId: undefined, theme: 'light' });
    const [uuIdValue, setUuIdValue] = useState(null);
    const [srcString, setSrcString] = useState('');
    const [messageTypes, setMessageTypes] = useState({});
    const [colorPrimary, setColorPrimary] = useState(token.colorPrimary);

    return {
        userName,
        setUserName,
        userId,
        setUserId,
        userInfo,
        setUserInfo,
        container,
        setContainer,
        systemInfo,
        setSystemInfo,
        uuIdValue,
        setUuIdValue,
        srcString,
        setSrcString,
        messageTypes,
        setMessageTypes,
        colorPrimary,
        setColorPrimary,
    };
}

const isUseSeverConfig = constants.CONFIG_LOCAL !== 'true';
const PROJECTNAME = constants.PROJECTNAME;
const settingPath = isUseSeverConfig
    ? `${constants.CONFIG_HOST}/configmanage/environment.json?isApply=true&projectName=${PROJECTNAME}`
    : `${constants.MICRO_APP_URL}/environment.json`;

const useEnvironmentModel = createModel(useEnvironment, {
    configPath: settingPath,
});

export { useEnvironmentModel };
export default createModel(useLoginInfo);
