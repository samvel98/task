import React, { useEffect, useMemo, useState } from "react";
import { useGetCatImagesQuery } from "../../features/api/apiSlice";
import "./cat-images.scss";
import { LoadingData } from "../";
import { useSelector, useDispatch } from "react-redux";
import { setImage, addImage, selectImages } from "../../store/cat-images.slice";

export const CatImage = ({ category }: { category: ICategory }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const {
    data: imagesData,
    isSuccess,
    isFetching,
  } = useGetCatImagesQuery({
    categoryIds: category.id,
    page: page,
  });

  const { images } = useSelector(selectImages);

  useEffect(() => {
    if (category.id) {
      setPage(1);
    }
  }, [category.id]);

  useMemo(() => {
    if (isSuccess) {
      if (page === 1) {
        dispatch(setImage(imagesData));
      } else {
        dispatch(addImage(imagesData));
      }
    }
  }, [isSuccess, page, dispatch, imagesData]);

  return (
    <ImageComponent
      images={images}
      loadMore={setPage}
      isFetching={isFetching}
    />
  );
};

const EmptyState = () => {
  return <div className="empty-state">There is nothing here</div>;
};

const ImageComponent = ({
  images,
  loadMore,
  isFetching,
}: {
  images: ICatImage[];
  loadMore: React.Dispatch<React.SetStateAction<number>>;
  isFetching: boolean;
}) => {
  return (
    <div className="main-container">
      {images.length ? (
        <>
          <div className="images-container">
            {images.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.url} alt="" />
              </div>
            ))}
          </div>
          {isFetching ? (
            <LoadingData />
          ) : (
            <div className="load-more">
              <button
                className="load-more-btn"
                onClick={() => loadMore((prev) => ++prev)}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : isFetching ? (
        <LoadingData />
      ) : (
        <EmptyState />
      )}
    </div>
  );
};
