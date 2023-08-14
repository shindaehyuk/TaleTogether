import axios from 'axios';

export default async function createSessionAxios(props) {
    // const userId = sessionStorage.getItem('email');
    try {
        // POST 요청은 body에 실어 보냄
        const res = await axios.post(
            // '//i9c110.p.ssafy.io/api/register-game',
            `//localhost:8083/openvidu/api/sessions`,
            {
                "mediaMode": "ROUTED",
                "recordingMode": "MANUAL",
                "customSessionId": "CUSTOM_SESSION_ID",
                "forcedVideoCodec": "VP8",
                "allowTranscoding": false,
                "defaultRecordingProperties": {
                    "name": "MyRecording",
                    "hasAudio": true,
                    "hasVideo": true,
                    "outputMode": "COMPOSED",
                    "recordingLayout": "BEST_FIT",
                    "resolution": "1280x720",
                    "frameRate": 25,
                    "shmSize": 536870912,
                    "mediaNode": {
                        "id": "media_i-0c58bcdd26l11d0sd"
                    }
                },
                "mediaNode": {
                    "id": "media_i-0c58bcdd26l11d0sd"
                }
            },
            {
                headers: {
                    'Authorization' : `Basic` + btoa ("OPENVIDUAPP:THEATERGLOATE"),
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(res);
        return res;
    } catch (e) {
        console.error(e);
        return false;
    }
}
