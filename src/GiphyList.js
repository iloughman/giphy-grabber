const GiphyList = (props) => {
    const items = props.gifs.map((itemData) => {
        return <Item url={itemData.images.fixed_width.url} />;
    });
    return <div className="masonry-with-columns">{items}</div>;
};
const Item = (props) => {
    return (
            <img src={props.url} />
    );
};
export default GiphyList;