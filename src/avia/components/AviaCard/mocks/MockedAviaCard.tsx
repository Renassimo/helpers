const MockedAviaCard = jest.fn(
  ({ additionalContent, chosen = false, imageUrl, imageAlt, title, link }) => (
    <div>
      MockedAviaCard - {title} -
      {additionalContent.map(
        (content: string | null, index: number) =>
          content && <div key={content + index}>{content}</div>
      )}{' '}
      - {chosen && 'chosen'} - {imageUrl} - {imageAlt} - {link}
    </div>
  )
);

export default MockedAviaCard;
