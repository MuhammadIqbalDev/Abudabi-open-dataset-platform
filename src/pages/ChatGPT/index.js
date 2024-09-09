import './style.css';
import React, { memo } from "react"
import View from "../../components/modules/View";
import Main from "../../components/modules/ChatGPT/Main";
import { useTranslation } from "react-i18next";

const ChatGPT = memo(() => {

    const { t, i18n } = useTranslation()

    return (
        <View theme="dark" footerTitle={t("GetMore")} footerButton={t("explorepublisher")}>
            <div style={{ maxWidth: "1800px", margin: "auto" }}>
                <div className="my-5 px-md-5 px-3">
                    <div className='overflow-auto'>
                        <Main />
                        <div className="container-fuild-sm container-md overflow-hidden py-3 px-md-5 pb-5 mb-5" style={{ height: '500px' }}>
                            <iframe style={{ height: '500px', width: '100%' }} className="iframe" src="http://192.168.0.4:8501/?embed=true"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </View >
    )
})

export default ChatGPT;