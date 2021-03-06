import React, { FC } from 'react';
import styled from 'lib/woowahan-components';

import starOn from 'assets/icons/star_on.png';
import starOff from 'assets/icons/star_off.png';
import GridForm from 'components/common/grid-form';
import TextButton from 'components/common/button/text-button';

interface IReviewPostProps {
  userId: null | string;
  postTitle: string;
  postContent: string;
  setPostTitle: React.Dispatch<React.SetStateAction<string>>;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
  setFile: (file: File) => void;
  star: number;
  setStar: (star: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: null | string;
  reviewSubmitLoading: boolean;
  fileRef: React.RefObject<HTMLInputElement>;
  isPaid: boolean;
}

const Wrapper = styled.section`
  border: 3px solid ${({ theme }) => theme?.colorLine};
  background-color: white;
  margin-bottom: 80px;

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: ${props => props.theme?.weightBold};
  }
  img {
    width: 18px;
    height: 17px;
  }
  input[type='button'] {
    cursor: pointer;
  }
  .star {
    width: 18px;
    height: 17px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    border: 0 !important;
  }
  .starOn {
    background-image: url(${starOn});
  }
  .starOff {
    background-image: url(${starOff});
  }

  textarea {
    max-width: 100% !important;
    width: 100% !important;
  }
`;

const Padding = styled.div`
  padding: 20px;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin-top: 20px;
  }
`;

const InputErrorMessage = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme?.colorError};
  text-align: center;
  margin-top: 10px;
`;

const makeStar = (star: number): boolean[] => {
  const arr = [];
  for (let i = 1; i <= 5; i += 1) {
    if (i <= star) arr.push(true);
    else arr.push(false);
  }
  return arr;
};

const ReviewPost: FC<IReviewPostProps> = ({
  userId,
  postTitle,
  postContent,
  setPostTitle,
  setPostContent,
  setFile,
  star,
  setStar,
  onSubmit,
  error,
  reviewSubmitLoading,
  fileRef,
  isPaid,
}) => {
  if (!userId || !isPaid) return null;
  return (
    <Wrapper>
      <Padding>
        <h3>???????????? ??????</h3>
        <form onSubmit={onSubmit}>
          <GridForm titles={['?????????', '??????', '??????', '??????', '????????????']}>
            <div>{userId}</div>
            <div>
              {makeStar(star).map((star, i) => {
                if (star)
                  return (
                    <input
                      className="star starOn"
                      type="button"
                      key={userId.concat(i.toString())}
                      onClick={() => setStar(i + 1)}
                    />
                  );
                return (
                  <input
                    className="star starOff"
                    type="button"
                    key={userId.concat(i.toString())}
                    onClick={() => setStar(i + 1)}
                  />
                );
              })}
            </div>
            <input
              value={postTitle}
              onChange={e => setPostTitle(e.target.value)}
              name="postTitle"
              required
              minLength={2}
              maxLength={30}
            />
            <textarea
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              name="postContent"
              required
              minLength={5}
              maxLength={100}
            />
            <input
              type="file"
              ref={fileRef}
              onChange={e => {
                const target = e.target as HTMLInputElement;
                const files = target.files as FileList;
                setFile(files[0]);
              }}
              accept=".jpg, .png, .jpeg"
            />
          </GridForm>
          <InputErrorMessage>{error}</InputErrorMessage>
          <Flex>
            <TextButton type="submit" styleType="black" title="??????" isLoading={reviewSubmitLoading} />
          </Flex>
        </form>
      </Padding>
    </Wrapper>
  );
};

export default ReviewPost;
