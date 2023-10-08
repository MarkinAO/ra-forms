import { useState } from 'react';
import './PhotoManager.css';
import ShowPreview from './ShowPreview';

function PhotoManager() {
    let [ photoList, setPhotoList ] = useState<string[]>([]);

    const fileToDataUrl = (file: File) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
        
            fileReader.addEventListener('load', (evt: any) => {
            resolve(evt.currentTarget.result)
            });
            
            fileReader.addEventListener('error', (evt: any) => {
            reject(new Error(evt.currentTarget.error));
            });
            
            fileReader.readAsDataURL(file);
        });
    }
      
    const handleSelect = async (evt: any) => {
        const files = [...evt.target.files];
        const urls = await Promise.all(files.map(o => fileToDataUrl(o)));
        const newList = [...new Set([...photoList, ...urls])];
        setPhotoList(photoList = newList);
        // У вас в массиве - dataUrl, можете использовать в качестве значения атрибута src тега img
    }

    const deleteImg = (url: string) => {
        const newPhotoList = photoList.filter(el => el !== url);
        setPhotoList(photoList = [...newPhotoList]);
    }

    return(
        <div className='phm-container'>
            <div className="decor-panel">
                <span className="cercle"></span>
                <span className="cercle"></span>
                <span className="cercle"></span>
            </div>
            <form onChange={async (e: any) => await handleSelect(e)}>
                <input className="inputfile" type="file" name="file" id="file" multiple />
                <label htmlFor="file">Click to select</label>
            </form>
            <div className="photos">
                { photoList.map((url: string) =>
                    <div className="preview-box" key={url}>
                        <ShowPreview url={url} deleteImg={(url: string) => deleteImg(url)} />
                    </div>                 
                ) }                
            </div>
        </div>
    )
}

export default PhotoManager;