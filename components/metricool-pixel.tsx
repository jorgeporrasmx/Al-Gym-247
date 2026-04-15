/**
 * Metricool Tracking Pixel
 * Invisible tracking pixel for analytics and visitor tracking
 * Does not affect layout or user experience
 */

export function MetricoolPixel() {
  return (
    <img
      src="https://tracker.metricool.com/c3po.jpg?hash=21b719279a8fd9d12166e0a9780b31f1"
      alt=""
      width={1}
      height={1}
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
      aria-hidden="true"
    />
  )
}
