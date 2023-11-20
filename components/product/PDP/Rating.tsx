import Icon from "$store/components/ui/Icon.tsx";

function Rating() {
  const productReview = 4;
  const productReviewQuantity = 0;
  const starArray = [1, 2, 3, 4, 5];

  return (
    <div class=" w-fit h-10 rounded-lg flex items-center gap-2">
      {starArray.map((value) => (
        <span
          key={value}
          class="inline-block w-fit h-fit"
        >
          {value <= productReview
            ? <Icon id="star" width={17} height={15} />
            : <Icon id="starVazia" width={17} height={15} />}
        </span>
      ))}
      <span>{`(${productReviewQuantity})`}</span>
    </div>
  );
}

export default Rating;
