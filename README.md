## Endpoints:
  ### Get Video Details
  - `/api/?id={eporner_video_id}&thumbsize{optional_thumbsize}`
    -  id (Required).
    -  thumbsize (optional default is medium).
      - `small` thumbnail size 190x152.
      - `medium` thumbnail size 427x240.
      - `big` thumbnail size 640x360.

  ### Resolve Video Sources
  - `/api/?resolve={eporner_video_id}`
    -  id (Required).

  ### Get Details and Sources in same response
  - `/api/full?id={eporner_video_id}&thumbsize{optional_thumbsize}`
    -  id (Required).
      -  thumbsize (optional default is medium).
        - `small` thumbnail size 190x152.
        - `medium` thumbnail size 427x240.
        - `big` thumbnail size 640x360.
        
  ### Get Category List (predefined in constants.js)
  - `/api/cats`

  ### Search For Videos
  - `/api/?query={query}&per_page={per_page}&page={page}&thumbsize={thumbsize}&order={order}&gay={gay}&lq={lq}`
    - `query` search string (Required).
      
    - `per_page` limits the number of results per page. valid range is ( 1, 1000 ). (Optional)
      
    - `page` (results page number. valid range is ( 1, 1000000 ) but no more than total_pages received in response). (Optional)
    
    -  `thumbsize` (size of thumbnails). (Optional)
       -  `small` thumbnail size 190x152.
       - `medium` thumbnail size 427x240.
       - `big` thumbnail size 640x360.
    
    - `order` how results should be sorted. (Optional)
      - `latest` newest videos first
      - `longest` longest videos first
      - `shortest` shortest videos first
      - `top-rated` top rated videos first
      - `most-popular` most popular all time videos first
      - `top-weekly` most popular this week videos first
      - `top-monthly` most popular this month videos first
     
    - `gay` should results include gay content (Optional)
      - `0` gay content not included
      - `1` gay content included
      - `2` only gay content
        
    - `lq` should results include content marked as low quality (Optional)
      - `0` low quality content not included
      - `1` low quality content included
      - `2` only low quality

### Vercel
Host your own instance of eporner-api-js on Vercel using the button below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FInside4ndroid%2Feporner-api-js)
