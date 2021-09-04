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

//-------------------------------------
const farewellText = `
We are sorry to hear that you are leaving our hive :(
    
We hope you had a good time with us! 

May the honey flows and flowers forever bloom....

Your Queen,
`;

const farewellHtml = `
<p><b>We are sorry to hear that you are leaving our hive :(</b></p>
<p>We hope you had a good time with us!</p>
<p>May the honey flows and flowers forever bloom....</p>
<p>Your Queen,<br/>
  <img src="https://crazyleafdesign.com/blog/wp-content/uploads/2016/10/bee-strong.jpg"/></p>
`;

const getFarewell = (email) => {
  return {
    to: `${email}`,
    subject: "Sorry to hear you want to leave our hive!",
    text: farewellText,
    html: farewellHtml,
  };
};

module.exports = {
  getWelcome,
  getFarewell,
};
