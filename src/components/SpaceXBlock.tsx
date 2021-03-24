import { Field, ComponentRendering, useComponentProps, GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import gql from 'graphql-tag';
import { StyleguideComponentProps } from 'lib/component-props';
import GraphQLClientFactory from 'lib/GraphQLClientFactory';

type SpaceXBlockProps = StyleguideComponentProps & {
  fields: {
    heading: Field<string>;
    url: Field<string>;
  };
  rendering: ComponentRendering
}

const SpaceXBlock = ({fields, rendering}: SpaceXBlockProps): JSX.Element => {
  const externalData = rendering.uid ? useComponentProps<any>(rendering.uid): undefined;
  
  return (
    <div className="container">
        <div className="heading">
          <h1>{fields.heading.value}</h1>
        </div>
        <div className="row">
          {externalData?.data.map((item: any) => (
            <div className="row" key={item.id} >
              <div className="card" style={{width: "18rem"}}>
              {item.links.flickr_images !== undefined && item.links.flickr_images.length > 0 ?
                <> 
                  <img className="card-img-top" src={item.links.flickr_images !== undefined && item.links.flickr_images.length > 0 ? item.links.flickr_images[0]: null}></img>
                </>
                : null
                }
                <div className="card-body">
                    <h4 className="cart-title">{item.launch_site.site_name_long}</h4>
                    <p>
                      {item.details}
                    </p>
                    <a target="_blank" href={item.links.article_link} className="btn btn-primary">Details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export const getStaticProps: GetStaticComponentProps = async (rendering) => {
  
  const url: any = rendering.fields?.url;
  console.log(url);
  const graphQLClient = GraphQLClientFactory(url.value);
  const result = await graphQLClient.query({
    query: gql`
    query {
      launchesPastResult (limit:100) {
        data{
          id,
          details
          launch_site {
            site_name,
            site_name_long
          },
          launch_success,
          launch_year,
          links {
            flickr_images,
            article_link,
            video_link
          }
        },
        result {
          totalCount
        }
      }
    }    
    `,
  });
  return result.data.launchesPastResult;  
}

export default SpaceXBlock;
