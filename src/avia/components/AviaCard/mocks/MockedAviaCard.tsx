const MockedAviaCard = jest.fn(
  ({ additionalContent, chosen = false, imageUrl, imageAlt, title }) => (
    <div>
      MockedAviaCard - {title} -
      {additionalContent.map(
        (content: string | null, index: number) =>
          content && <div key={content + index}>{content}</div>
      )}{' '}
      - {chosen && 'chosen'} - {imageUrl} - {imageAlt}
    </div>
  )
);

export default MockedAviaCard;
