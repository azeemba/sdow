import React, {Component} from 'react';

import PathArticle from './PathArticle';

import {PathResult, PathResultsMessage, PathResultsWrapper} from './PathResults.styles';

class PathResults extends Component {
  render() {
    const {paths} = this.props;

    let pathsContent;
    if (paths !== null && paths.length === 0) {
      pathsContent = <p>No paths found!</p>;
    } else if (paths !== null) {
      // TODO: special case when to and from page are the same (something snarky like "You can't
      // trick me that easily..." or "Wow, those articles have zero degrees of separation. But you
      // didn't really need this website to prove that...");
      const pathsCount = paths.length;
      const degreesOfSeparationCount = paths[0].length - 1;
      const pathResults = paths.map((path) => {
        const pathArticles = path.map((articleTitle, index) => {
          const isEndArticle = index === path.length - 1;
          return <PathArticle title={articleTitle} isEndArticle={isEndArticle} />;
        });
        return <PathResult>{pathArticles}</PathResult>;
      });

      const pathOrPaths = pathsCount === 1 ? 'path' : 'paths';
      const degreeOrDegrees = degreesOfSeparationCount === 1 ? 'degree' : 'degrees';

      pathsContent = (
        <div>
          <PathResultsMessage>
            {pathsCount} {pathOrPaths} found with {degreesOfSeparationCount} {degreeOrDegrees} of
            separation!
          </PathResultsMessage>
          {pathResults}
        </div>
      );
    }

    return <PathResultsWrapper>{pathsContent}</PathResultsWrapper>;
  }
}

export default PathResults;