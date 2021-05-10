import * as React from "react";

import './style.css'
import NewsItem from "../NewsItem";

type NewsBlockProps = {
}

const NewsBlock: React.FunctionComponent<NewsBlockProps> = () => {
    return (
        <div  className="news-block">
            <h2>News</h2>
            <ul className="news-list">
                <NewsItem text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus elementum augue et fringilla pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit. " isUrgent={true}/>
                <NewsItem text="Sed at iaculis sem. Integer ut consectetur magna. Vivamus egestas at libero id accumsan. Vivamus ac ante in sapien malesuada semper." isUrgent={false}/>
                <NewsItem text="Proin quis lectus velit. Nam pretium lectus metus, in vulputate massa finibus vel. Fusce eget dolor euismod, bibendum lorem et, tincidunt elit. Nam tincidunt ex vel efficitur dapibus. Aliquam faucibus, ligula at mattis porta." isUrgent={false}/>
            </ul>
        </div>
    );
}

export default NewsBlock;