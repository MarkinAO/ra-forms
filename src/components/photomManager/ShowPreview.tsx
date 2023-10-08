interface IProps {
    url: string
    deleteImg: Function
}

function ShowPreview(props: IProps) {
    const { url, deleteImg } = props;
    return(
        <>
            <div className="preview">
                <img className="preview-img" src={url} />
            </div>            
            <div className="preview-cross" onClick={() => deleteImg(url)}>x</div>
        </>
    )
}

export default ShowPreview;