import "./LoopItem.css";
import User from "./User";
import Tags from "./Tags";
import Interact from "./Interact";
import Content from "./Content";
import Feedback from "./Feedback";

// Props will have an username an image, content and more tags
const LoopItem = ({ loop }) => {
  return (
    <div className="loop">
      <User username={loop.user} />
      <Interact links={[]} />
      <Tags languages={loop.language} />
      <Content
        languages={loop.language}
        description={loop.description}
        content={loop.content}
      />
      <Feedback />
    </div>
  );
};

export default LoopItem;
