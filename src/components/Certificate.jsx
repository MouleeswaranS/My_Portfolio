import PropTypes from "prop-types"

const Certificate = ({ ImgSertif, title, onClick }) => {
	return (
		<div style={{ width: "100%" }}>
			{/* Thumbnail Container */}
			<div
				style={{
					position: "relative",
					overflow: "hidden",
					borderRadius: "8px",
					boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					cursor: "pointer",
				}}
				onClick={(e) => { e.stopPropagation(); onClick(); }}
			>
				{/* Certificate Image with Initial Filter */}
				<div
					style={{
						position: "relative",
					}}>
					<img
						src={ImgSertif}
						alt={title || "Certificate"}
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							objectFit: "cover",
							filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
							transition: "filter 0.3s ease",
						}}
						onClick={(e) => { e.stopPropagation(); onClick(); }}
					/>
				</div>
			</div>
		</div>
	)
}

Certificate.propTypes = {
	ImgSertif: PropTypes.string.isRequired,
	title: PropTypes.string,
	onClick: PropTypes.func,
}

export default Certificate
