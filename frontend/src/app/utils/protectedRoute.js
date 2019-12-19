import React,{useEffect} from 'react'
import { navigate } from 'hookrouter'
import JwtDecode from 'jwt-decode';
export default function ProtectedRoute(props) {
    useEffect(() => {
        if(window.localStorage.getItem('token') === "" || window.localStorage.getItem('token') === null){
            navigate('/');
        }
        
        let decode = JwtDecode("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1NzY3NzM0MjksImV4cCI6MTU3Njg1OTQyOSwicm9sZXMiOlsiUk9MRV9URUFDSEVSIiwiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoibGVwaXZlcnAifQ.QdXqdz5TFe2Xg5rPwJaUcKJjexs1AoUHz46f8HAgHBdn84vVCBVjvmPHEw3bSUflcES139kjFl60HaI0D_QTuYMX5F6BpNW9yc9zpXA7E7P5T-FIsaTPZth_57IH2SAX2muwLs7Np33fKh4TOliV6ypmFZOXmiODHO6zw-hHmIFA6S3nRIOVUGCJW9NBYQ2FGIhiVWpbE233Y4ENBtAhPX1dv6W3wgZupIOIxENULqSYdxFrcnMZ03KmMIdAGTzx-ACYymX08OoTrAK-8Arr7nw91U8KSl4ILBljQpklgpMJ1LJFx640gkqMwOSTUa6raM2AeHKtbmlyJbqLA-lvMtiMVO_tmuzc4k_j8k6MkyE6F2LiuKwlzVXEZ3tSPDM0upsWbWEYO6cHTstNYU2EMMiTJ5h5FRnoYNc01hv_HR0W1-1SgUtimSn9PW31pM6gFBmpd5iIlmGNyB1DdmAlmKBzanLh1EI1YT9dn4n1BdkW-_lkt_QCv6WF9UD_kxTGx6jnlCSgT8hMdWMop6Ows290yz-gvjdUkjZ8TI4SYPvIN0MqhghKEAC_mN_6bJucq3rqVHceTEbH08diW8jHhgpxCDjz7blcF9oy00kSMtiDXT41Qpy9FKTv1SUgeu982ggEJjhBNTSw_AZMQGDjQQenHiyjkB7ic5S2UmjzCdA")
        console.log(decode.exp);
        
        if(decode.exp < Date.now() ){
            navigate('/');
        }
        

    },[])
    return (
        <div>
            {props.children}
        </div>
    )
}
