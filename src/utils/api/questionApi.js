import {post, get, postAd, getAd } from '../ApiCaller';
import authHeader from './HeaderAuthorization';
import localFileApi from './localFileApi';

const questionApi = {

    //Stack: 
    createNewStack: async(data)=>{
        const endpoint = `/api/v2/question-stacks`; 
        // return await postAd(endpoint, data, authHeader())
        //     .then((res) => {
        //         return res;
        //     })
        //     .catch((err) => {
        //         return err;
        //     });
        //  const authHeader = () => {
        //             // Giả sử bạn có một hàm để lấy header xác thực
        //             return { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYzlkZWNiNC1jMTE4LTRjNmUtODliMS05NjVhOTc0ZjlkY2YiLCJ1c2VybmFtZSI6ImFkbWluMS5mLWNvZGUudGVzdEBlbWFpbC5jb20iLCJpYXQiOjE3MTg2MTE3MzEsImV4cCI6MTcxODY5ODEzMX0.ruASdNhUkQrjmxreu2AKnm2rNYFGNHFKPe_unkVrV08' };
        //         };
        const token = authHeader();
        const data2= JSON.stringify(data);
        const headers =  {
                'Content-Type': 'application/json',
                ...token
        };
        
        return await postAd(endpoint, data2, {}, headers)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                return err;
            });
    },

    getIdOfStack: async (name) => {
        const endpoint = `/api/v2/question-stacks`; 
        return await getAd(endpoint, authHeader())
            .then((res) => {
                const result = res.data.find(item => item.name === name);
                console.log(result);
                return result ? result.id : null;
            })
            .catch((err)=> {
                return err;
            })
    }



    // userGetAllQuestion: async (data) => {
    //     const endpoint = `/rooms/user-get-all`;
    //     // eslint-disable-next-line no-return-await

    //     return await get(endpoint, data, authHeader())
    //         .then((res) => {
    //             // if (res.data.code !== 200) console.log(res.response);
    //             return res;
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // },
    // getAllRoomType: async () => {
    //     const token = localStorage.getItem('token');
    //     const endpoint = `/rooms/get-all-room-type`;
    //     return await get(endpoint, {}, { Authorization: 'Bearer ' + token });
    // },
    // getRoomByCode: async (code) => {
    //     const endpoint = `/rooms/get-one-by-code/${code}`;
    //     return await get(endpoint, {}, authHeader())
    //         .then((res) => {
    //             return res;
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // },
    // getRoomById: async (roomID) => {
    //     const endpoint = `/rooms/get-one-by-id/${roomID}`;
    //     return await get(endpoint, {}, authHeader())
    //         .then((res) => {
    //             return res;
    //         })
    //         .catch((err) => {
    //             return err;
    //         });
    // },
//     adminGetAll: async (req) => {
//         const endpoint = `/api/v2/question-stacks/${id}`;
//         // eslint-disable-next-line no-return-await

//         return await get(endpoint, req, authHeader())
//             .then((res) => {
//                 // if (res.data.code !== 200) console.log(res.response);
//                 return res;
//             })
//             .catch((err) => {
//                 return err;
//             });
//     },
//     createOne: async (data) => {
//         const token = localStorage.getItem('token');
//         const endpoint = `/rooms/create-one`;
//         return await post(endpoint, data, {}, { Authorization: 'Bearer ' + token })
//             .then((res) => res)
//             .catch((err) => err);
//     },
//     updateRoomById: async (roomID, data) => {
//         const token = localStorage.getItem('token');
//         const endpoint = `/rooms/update-one-by-id/${roomID}`;
//         // eslint-disable-next-line no-return-await

//         return await post(endpoint, data, {}, { Authorization: 'Bearer ' + token })
//             .then((res) => {
//                 // if (res.data.code !== 200) console.log(res.response);

//                 return res;
//             })
//             .catch((err) => {
//                 return err;
//             });
//     },
//     getAllRomType: async () => {
//         const endpoint = `/rooms/get-all-room-type`;
//         // eslint-disable-next-line no-return-await

//         return await get(endpoint, {}, authHeader())
//             .then((res) => {
//                 // if (res.data.code !== 200) console.log(res.response);
//                 return res;
//             })
//             .catch((err) => {
//                 return err;
//             });
//     },
//     getSubmitHistoryByQuestion: async (question, currentPage) => {
//         const endpoint = `/submit-history/get-by-question/${question}?page=${currentPage}&limit=1000`;
//         // eslint-disable-next-line no-return-await

//         return await get(endpoint, {}, authHeader())
//             .then((res) => {
//                 // if (res.data.code !== 200) console.log(res.response);
//                 return res;
//             })
//             .catch((err) => {
//                 return err;
//             });
//     },
//     getSubmitHistoryByRoom: async (data) => {
//         const endpoint = `/submit-history/get-by-room/${data.id}`;
//         // eslint-disable-next-line no-return-await

//         return await get(endpoint, { roomId: data.id, limit: 100, page: 1 }, authHeader())
//             .then((res) => {
//                 // if (res.data.code !== 200) console.log(res.response);

//                 return res;
//             })
//             .catch((err) => {
//                 return err;
//             });
//     },
};

export default questionApi;
