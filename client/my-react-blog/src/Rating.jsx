const RatingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const Star = styled.span`
  cursor: pointer;
  color: gold;

  &:hover,
  &.selected {
    transform: scale(1.3);
  }
`;

const Rating = ({rating, setRating}) => {
  return (
    <RatingContainer>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={rating > index ? 'selected' : ''}
          onClick={() => setRating(index + 1)}
        >
          ★
        </Star>
      ))}
    </RatingContainer>
  );
};

// Integra el componente Rating en PostCard
const PostCard = ({ post }) => {
  const [selected, setSelected] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <Card onClick={() => setSelected(!selected)} style={{transform: selected ? 'scale(1.1)' : 'none'}}>
      <CardImage src={post.imagePath} alt={post.flower_name} />
      <CardTitle>{post.flower_name}</CardTitle>
      <CardBody>Color: {post.color}</CardBody>
      <CardBody>Season: {post.season}</CardBody>
      <CardBody>Created At: {new Date(post.created_at).toLocaleDateString()}</CardBody>
      <Rating rating={rating} setRating={setRating} />
    </Card>
  );
};
