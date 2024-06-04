const refreshToken = localStorage.getItem('refresh_token');
console.log(refreshToken);


// if (!refreshToken) {
//   console.error('Refresh token not found in localStorage');
// } else {
//   fetch('http://localhost:3000/users/refresh-token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${refreshToken}`
//     },
//     body: JSON.stringify({ refresh_token: refreshToken })
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log('Success:', data);
//     // Lưu access token mới vào localStorage hoặc xử lý dữ liệu nhận được
//     localStorage.setItem('access_token', data.access_token);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
// }
