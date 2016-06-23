module.exports = [
  {
    user: [
      {
        id: 1,
        name: 'Sepehr Vakili',
        email: 'sdvakili@gmail.com',
        fbId: '',
        accessToken: '',
        refreshToken: '',
        currLat: '37.760061',
        currLng: '-122.427020',
        prevLat: '37.760061',
        prevLng: '-122.427020',
        imageUrl: 'http://c51e0534b271998a1a94-58706dfbc342bfcb8f938b36c845fe8a.r14.cf1.rackcdn.com/uploads/first-person-sharing-our-story.jpg',
        repCount: 1,
      },
      {
        id: 2,
        name: 'Jordan Tepper',
        email: 'jstepper91@gmail.com',
        fbId: '',
        accessToken: '',
        refreshToken: '',
        currLat: '37.783533',
        currLng: '-122.409311',
        prevLat: '37.783533',
        prevLng: '-122.409311',
        imageUrl: 'http://i.telegraph.co.uk/multimedia/archive/03491/Vladimir_Putin_1_3491835k.jpg',
        repCount: 1,
      },
    ],
  },
  {
    place: [
      {
        id: 1,
        name: 'Mission Dolores Park',
        lat: '37.760061',
        lng: '-122.427020',
        favsCount: 4,
        pinnedCount: 2,
      },
      {
        id: 2,
        name: 'Hack Reactor',
        lat: '37.783533',
        lng: '-122.409311',
        favsCount: 3,
        pinnedCount: 1,
      },
    ],
  },
  {
    userPlaces: [
      {
        id: 1,
        note: 'Hack Reactor is Awesome!',
        imageUrl: 'https://hrhq.squarespace.com/assets/images/school-working@2x.jpg',
        videoUrl: '',
        userId: 1,
        placeId: 2,
      },
      {
        id: 2,
        note: 'An awesome place to spend your Sundays!',
        imageUrl: 'http://brokeassstuart.com/wp-content/pictsnShit/2014/04/dolores-park.jpg',
        videoUrl: '',
        userId: 2,
        placeId: 1,
      },
    ],
  },
  {
    fav: [
      {
        id: 1,
        starred: true,
        placeId: 1,
        userId: 1,
      },
      {
        id: 2,
        starred: true,
        placeId: 2,
        userId: 2,
      },
    ],
  },
  {
    follow: [
      {
        id: 1,
        following: true,
        userId: 1,
        followedId: 2,
      },
      {
        id: 2,
        following: true,
        userId: 2,
        followedId: 1,
      },
    ],
  },
];
