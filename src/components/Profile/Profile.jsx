// import React, { useEffect, useState } from "react";
// import getUserById from "../Event/getUserById";
// import ProfilePicture from "../../components/ProfilePicture";

// const Profile = (user_id) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     getUserById(user_id).then((user) => setUser(user));
//   }, []);
//   return (
//     <div>
//       <div class="card mb-3" style="max-width: 540px;">
//         <div class="row no-gutters">
//           <div class="col-md-4">
//             <ProfilePicture imageURL={poster.profile_picture} />
//           </div>
//           <div class="col-md-8">
//             <div class="card-body">
//               <h5 class="card-title">{user.username}</h5>
//               <p class="card-text">{user.first_name + user.last_name}</p>
//               <p class="card-text">
//                 <small class="text-muted">{user.email}</small>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
