import Card from '../CardComponent/Card';

const Collection = ({title, translate, series, episode, status, poster, raiting, comment, newSeason, setAllSerials, id }) => {
    
    return(
        <div>
            <Card 
            title={ title }
            translate={ translate }
            series={ series }
            episode={ episode }
            status={ status }
            poster={poster}
            raiting={raiting}
            comment={comment}
            newSeason={newSeason}
            setAllSerials={ setAllSerials }
            id={id}
            />
        </div>
    )
}

export default Collection;