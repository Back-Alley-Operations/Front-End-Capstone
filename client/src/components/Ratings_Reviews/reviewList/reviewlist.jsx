import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import ReviewListItem from './reviewlistitem.jsx';
import AddReviewModal from './addReviewModal.jsx';
import MetaContext from '../context/MetaContext.js';
import BigContext from '../context/BigContext.js';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px 20 px 20px;
  margin-left: 40px;
  width: 100%;
`;

const ReviewSorter = styled.div`
  font-size: large;
  margin-bottom: 12px;
`;

const List = styled.div`
  overflow: auto;
  height: 550px;
  border-style: solid;
  border-width: 1px 0 1px 0;
  border-color: rgb(238, 238, 238);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 0 40px 0;
`;

const Button = styled.button`
  cursor: pointer;
  height: 40px;
  type: submit;
  width: 130px;
`;

// put an onchange listener on select
// if a new option is selected, set state of sort to that option
//

const ReviewList = ({ reviews }) => {
  const [modalOpened, setModal] = useState(false);
  const { sortType, setSortType } = useContext(MetaContext);
  const { ratingFilter, setRatingFilter } = useContext(BigContext);

  let reviewList = reviews.results;
  // if there are filters in place, filter out reviews
  if (ratingFilter.length !== 0) {
    reviewList = reviews.results.filter((item) => ratingFilter.includes(item.rating.toString()));
    console.log('review list', reviewList);
  } else {
    reviewList = reviews.results;
  }

  const handleSort = (e) => {
    setSortType(e.target.value);
  };

  if (modalOpened) {
    document.documentElement.style.overflow = 'clip';
  } else {
    document.documentElement.style.overflow = 'scroll';
  }
  if (reviewList.length === 0) {
    return (
      <Container>
        <ReviewSorter>
          248 reviews, sorted by:
          {'  '}
          <select onChange={handleSort}>
            <option>helpful</option>
            <option>newest</option>
            <option>relevant</option>
          </select>
        </ReviewSorter>
        <List>
          No Reviews of Current Rating
        </List>
        <ButtonWrapper>
          <Button>More Reviews</Button>
          <Button onClick={() => setModal(true)}>Add a Review   +</Button>
        </ButtonWrapper>
        <AddReviewModal open={modalOpened} onClose={() => setModal(false)} />
      </Container>
    );
  }
  return (
    <Container>
      <ReviewSorter>
        248 reviews, sorted by:
        {'  '}
        <select onChange={handleSort}>
          <option>helpful</option>
          <option>newest</option>
          <option>relevant</option>
        </select>
      </ReviewSorter>
      <List>
        {reviewList.map((item) => <ReviewListItem key={item.review_id} item={item} />)}
      </List>
      <ButtonWrapper>
        <Button>More Reviews</Button>
        <Button onClick={() => setModal(true)}>Add a Review   +</Button>
      </ButtonWrapper>
      <AddReviewModal open={modalOpened} onClose={() => setModal(false)} />
    </Container>
  );
};

export default ReviewList;
