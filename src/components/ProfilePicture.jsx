const ProfilePicture = ( {imageURL} ) => {
  return (
    <img
      src={imageURL}
      alt={"https://courses.cs.northwestern.edu/394/guides/images/me-sept-2014-small.png"}   
      style={{
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  )

};

export default ProfilePicture;