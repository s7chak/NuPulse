import React from 'react';

const StoryTable = ({ res }) => {
  const data = res.data;
  const storyTypes = res.types;
  const count = res.total;
  return (
    <div className="story-table-container">
      <h3>Articles</h3>
      <h5>Types: Count</h5>
      <h5>{storyTypes} : {count}</h5>
      <table>
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          {data.map((story, index) => (
            <tr key={index}>
              <td>
                <Tile title={story.OTitle} link={story.Link} type={story.Type} datetime={story.Date} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


const Tile = ({ title, link, type, datetime }) => {
  const handleTileClick = () => {
    window.open(link, '_blank');
  };

  return (
    <div className="tile" onClick={handleTileClick}>
      <div className="tile-content">
        <a className="titleLink" href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
        <span className="type">{type}</span>
        <span className="pdate">{datetime}</span>
      </div>
    </div>
  );
};


export default StoryTable;
