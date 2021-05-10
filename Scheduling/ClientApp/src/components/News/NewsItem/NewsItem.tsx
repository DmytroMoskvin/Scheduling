import * as React from "react";

import './style.css'

type NewsItemProps = {
    text: string,
    isUrgent: boolean
}

const NewsItem: React.FunctionComponent<NewsItemProps> = ({text, isUrgent}) => {
    return (
        <>
            <li className={`news-item ${isUrgent ? "urgent" : ""}`}>
                {text}
            </li>
        </>
    );
}

export default NewsItem;