const welcomeText = `
Welcome to the hive!
    
We hope that you are buzzing with excitement to get beeeesy training

Your Queen,
`;

const welcomeHtml = `
<p><b>Welcome to the hive!</b></p>
<p>We hope that you are buzzing with excitement to get beeeesy training</p>
<p>Your Queen,<br/>
  <img src="https://crazyleafdesign.com/blog/wp-content/uploads/2016/10/bee-strong.jpg"/></p>
`;

const getWelcome = (email) => {
  return {
    to: `${email}`, // list of receivers
    subject: "Welcome to the hive!", // Subject line
    text: welcomeText, // plain text body
    html: welcomeHtml, // html of message
  };
};

module.exports = {
  getWelcome,
};
