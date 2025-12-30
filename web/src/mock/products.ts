import type { Product } from "@/types/product";

const COLORS = ["Đen", "Trắng", "Xanh", "Be", "Nâu"];
const SIZES = ["S", "M", "L", "XL"];
const BRANDS = ["NaggiHunter", "SatNhanDaDen", "QuaiVatDaMau", "Nige"];

/**
 * Quy tắc:
 * - discount CHỈ tồn tại khi > 0
 * - discount = 0 sẽ bị loại bỏ khỏi object
 */
function createProduct(
  id: number,
  title: string,
  price: number,
  image: string,
  brand: string,
  color: string,
  size: string,
  category: string,
  stock: number,
  rating: number,
  description: string,
  discount?: number
): Product & { discount?: number } {
  return {
    _id: `p${id}`,
    title,
    slug: `san-pham-${id}`,
    price,
    images: [image],
    stock,
    rating,
    brand,
    variants: [{ color, size }],
    description,
    category,
    ...(discount && discount > 0 ? { discount } : {}),
  };
}

export const PRODUCTS: (Product & { discount?: number })[] = [
createProduct(1, "Áo Thần Thoại", 199000, "/IMAGES/1.png", BRANDS[0], COLORS[0], SIZES[0], "fashion", 0, 5,
  "Chiếc áo mang phong cách thần thoại, sang trọng và huyền bí.", 20),

createProduct(2, "Quần Chiến Binh", 299000, "/IMAGES/2.png", BRANDS[1], COLORS[1], SIZES[1], "fashion", 42, 4,
  "Quần mạnh mẽ, thiết kế dành cho người yêu phong cách chiến binh.", 0),

createProduct(3, "Áo Phượng Hoàng", 259000, "/IMAGES/3.png", BRANDS[2], COLORS[2], SIZES[2], "accessories", 17, 3,
  "Áo in hình phượng hoàng, tượng trưng cho sự tái sinh và quyền lực.", 30),

createProduct(4, "Áo Mặt Trời", 199000, "/IMAGES/6.png", BRANDS[0], COLORS[3], SIZES[0], "fashion", 63, 5,
  "Áo rực rỡ như ánh mặt trời, mang lại năng lượng tích cực.", 25),

createProduct(5, "Quần Sói Hoang", 299000, "/IMAGES/4.png", BRANDS[1], COLORS[4], SIZES[1], "fashion", 0, 2,
  "Quần in họa tiết sói hoang, mạnh mẽ và tự do.", 0),

createProduct(6, "Áo Biển Xanh", 259000, "/IMAGES/5.png", BRANDS[2], COLORS[0], SIZES[2], "accessories", 54, 4,
  "Áo mang sắc xanh biển, mát mẻ và phóng khoáng.", 35),

createProduct(7, "Áo Rồng Vàng", 199000, "/IMAGES/7.png", BRANDS[0], COLORS[1], SIZES[3], "fashion", 39, 5,
  "Áo in hình rồng vàng, biểu tượng của quyền lực và may mắn.", 20),

createProduct(8, "Quần Sấm Sét", 299000, "/IMAGES/8.png", BRANDS[1], COLORS[2], SIZES[0], "fashion", 0, 3,
  "Quần thiết kế độc đáo, mạnh mẽ như sấm sét.", 0),

createProduct(9, "Áo Ngọc Trai", 259000, "/IMAGES/9.png", BRANDS[2], COLORS[3], SIZES[1], "accessories", 77, 4,
  "Áo tinh tế với sắc trắng ngọc trai, thanh lịch và sang trọng.", 30),

createProduct(10, "Quần Bão Táp", 199000, "/IMAGES/10.png", BRANDS[0], COLORS[4], SIZES[2], "fashion", 33, 2,
  "Quần mang phong cách mạnh mẽ, như cơn bão táp dữ dội.", 0),

createProduct(11, "Áo Ánh Trăng", 299000, "/IMAGES/11.png", BRANDS[1], COLORS[0], SIZES[3], "fashion", 19, 5,
  "Áo nhẹ nhàng, lãng mạn như ánh trăng đêm.", 20),

createProduct(12, "Váy Lửa Thiêng", 259000, "/IMAGES/12.png", BRANDS[2], COLORS[1], SIZES[0], "accessories", 88, 4,
  "Quần mang sắc đỏ rực, tượng trưng cho ngọn lửa thiêng.", 0),

createProduct(13, "Áo Gió Xuân", 199000, "/IMAGES/13.png", BRANDS[0], COLORS[2], SIZES[1], "fashion", 25, 3,
  "Áo nhẹ nhàng, thoáng mát như gió xuân.", 30),

createProduct(14, "Quần Đêm Đen", 299000, "/IMAGES/14.png", BRANDS[1], COLORS[3], SIZES[2], "fashion", 61, 2,
  "Quần màu đen huyền bí, phù hợp phong cách mạnh mẽ.", 0),

createProduct(15, "Áo Hoa Đào", 259000, "/IMAGES/15.png", BRANDS[2], COLORS[4], SIZES[3], "accessories", 46, 5,
  "Áo in hoa đào, tượng trưng cho sự tươi mới và may mắn.", 20),

createProduct(16, "Tranh 'The Emperor Beyound Latitude'", 199000, "/IMAGES/16.png", BRANDS[0], COLORS[0], SIZES[0], "fashion", 14, 4,
  "Vị hoàng đế mặc giáp đỏ, áo choàng tung bay, thần thái uy nghi.", 25),

createProduct(17, "Tranh 'Sự Chấn Động'", 299000, "/IMAGES/17.png", BRANDS[1], COLORS[1], SIZES[1], "fashion", 0, 3,
  "Phía bên kia đại dương là tự do hay kẻ thù.", 0),

createProduct(18, "Tranh 'Chiến Binh Số 1'", 259000, "/IMAGES/18.png", BRANDS[2], COLORS[2], SIZES[2], "accessories", 37, 5,
  "Chiến binh trong tư thế chiến đấu.", 30),

createProduct(19, "Tranh 'Hỏa Long tranh đấu Thủy Thú'", 199000, "/IMAGES/19.png", BRANDS[0], COLORS[3], SIZES[3], "fashion", 9, 2,
  "Charizard và Blastoise đối đầu dữ dội, cuộc chiến lưng trời động biển.", 0),

createProduct(20, "Tranh 'Cuộc Đối Đầu Rực Lửa của người khổng lồ ánh sáng'", 299000, "/IMAGES/20.png", BRANDS[1], COLORS[4], SIZES[0], "fashion", 56, 4,
  "Người khổng lồ ánh sáng tung cú đấm vào quái vật giữa thành phố cháy rực.", 40),

createProduct(21, "Tranh 'Người khổng lồ ánh sáng'", 259000, "/IMAGES/21.png", BRANDS[2], COLORS[0], SIZES[1], "accessories", 44, 5,
  "Người khổng lồ ánh sáng trong tư thế chiến đấu, họa tiết sóng nước.", 20),

createProduct(22, "Tranh 'Thiền Giả và Thần Hộ Mệnh'", 199000, "/IMAGES/22.png", BRANDS[0], COLORS[1], SIZES[2], "fashion", 0, 3,
  "Một thiền giả tóc bạc ngồi giữa vòng xoáy năng lượng.", 0),

createProduct(23, "Tranh 'Tam Thân Ma Thần'", 299000, "/IMAGES/23.png", BRANDS[1], COLORS[2], SIZES[3], "fashion", 27, 4,
  "Ba hình thái của Majin Buu xuất hiện trong thế chiến đấu dữ dội.", 30),

createProduct(24, "Tranh 'Chiến Thần Nguyệt Hầu'", 259000, "/IMAGES/24.png", BRANDS[2], COLORS[3], SIZES[0], "accessories", 65, 2,
  "Goku hóa Super Saiyan 4 trong thế chiến đấu dữ dội.", 0),

createProduct(25, "Tranh 'Bản Năng Cái Tôi Cực Đoan'", 199000, "/IMAGES/25.png", BRANDS[0], COLORS[4], SIZES[1], "fashion", 0, 5,
  "Vegeta bản năng hủy diệt, thể hiện sức mạnh siêu phàm.", 20),

createProduct(26, "Tranh 'Bản Năng Vô Cực'", 299000, "/IMAGES/26.png", BRANDS[1], COLORS[0], SIZES[2], "fashion", 22, 3,
  "Chiến binh tóc trắng tung thế võ giữa vòng xoáy lửa và hào quang thần bí.", 30),

createProduct(27, "Tranh 'Long Túc Cầu Vương'", 259000, "/IMAGES/27.png", BRANDS[2], COLORS[1], SIZES[3], "accessories", 36, 4,
  "Cầu thủ Argentina tung cú sút, rồng lửa cuộn quanh đầy khí thế.", 0),

createProduct(28, "Tranh 'Chiến Giáp Hoàng Kim'", 199000, "/IMAGES/28.png", BRANDS[0], COLORS[2], SIZES[0], "fashion", 0, 2,
  "Mecha giáp vàng tung kiếm và khiên giữa.", 20),

createProduct(29, "Tranh 'Lôi Kiếm Chiến Vương'", 299000, "/IMAGES/29.png", BRANDS[1], COLORS[3], SIZES[1], "fashion", 41, 5,
  "Mehca giáp đỏ tung kiếm và quyền trượng.", 30),

createProduct(30, "Tranh 'Dương Cước Trảm Long'", 259000, "/IMAGES/30.png", BRANDS[2], COLORS[4], SIZES[2], "accessories", 47, 4,
  "Chiến thần giáng cú đá vào rồng dữ giữa vầng dương.", 0),

createProduct(31, "Tranh 'Hỏa Kiếm và Ma Thủ'", 199000, "/IMAGES/31.png", BRANDS[0], COLORS[0], SIZES[3], "fashion", 0, 5,
  "Viêm Trụ tung kiếm giáng xuống Thượng Huyền Tam.", 20),

createProduct(32, "Tranh 'Nhất Quyền Định Ma'", 299000, "/IMAGES/32.png", BRANDS[1], COLORS[1], SIZES[1], "fashion", 61, 3,
  "Saitama tung cú đấm chí mạng vào Boros, khí thế ngút trời.", 0),

createProduct(33, "Tranh 'Thú Vương Đại Chiến'", 259000, "/IMAGES/33.png", BRANDS[2], COLORS[2], SIZES[1], "accessories", 18, 4,
  "Godzilla và King Kong đối đầu giữa mây lửa và hoàng hôn.", 20),

createProduct(34, "Tranh 'Định Mệnh Bất Khả Phá'", 199000, "/IMAGES/34.png", BRANDS[0], COLORS[3], SIZES[2], "fashion", 73, 2,
  "Jotaro và Star Platinum tung thế phá vỡ số phận.", 0),

createProduct(35, "Tranh 'Thời Không Ma Vương'", 299000, "/IMAGES/35.png", BRANDS[1], COLORS[4], SIZES[3], "fashion", 34, 5,
  "DIO cầm mặt nạ đá, sau lưng là The World.", 30),

createProduct(36, "Tranh 'Long Tranh Hổ Đấu'", 259000, "/IMAGES/36.jpg", BRANDS[2], COLORS[0], SIZES[0], "accessories", 52, 3,
  "Rồng xanh toát mồ hôi, hổ cam nâng tạ gầm vang.", 0),

createProduct(37, "Tranh 'Tọa Sơn Quan Hổ Đấu'", 199000, "/IMAGES/37.jpg", BRANDS[0], COLORS[1], SIZES[1], "fashion", 0, 4,
  "Ba hổ chơi mạt chược dưới núi, đạo sĩ ngồi uống rượu trên vách.", 20),

createProduct(38, "Tranh 'Mãnh Hổ Định Giang Sơn'", 299000, "/IMAGES/38.jpg", BRANDS[1], COLORS[2], SIZES[2], "fashion", 66, 5,
  "Hổ đứng trên đỉnh núi đá, trấn giữ non sông giữa trời cao.", 30),

createProduct(39, "Tranh 'Đơn Kỵ Vạn Lý'", 259000, "/IMAGES/39.png", BRANDS[2], COLORS[3], SIZES[3], "accessories", 27, 2,
  "Võ tướng cổ cưỡi xe đạp xuyên núi mây, mang khí chất hào hùng.", 0),

createProduct(40, "Tranh 'Tam Anh Chiến Lữ Bố Phiên Bản Xe Máy'", 199000, "/IMAGES/40.png", BRANDS[0], COLORS[4], SIZES[0], "fashion", 0, 4,
  "Bốn võ tướng thời Tam Quốc lao vào trận chiến rực lửa trên mô tô và xe đạp.", 25),

createProduct(41, "Tranh 'An Nhiên Sơn Cảnh'", 299000, "/IMAGES/41.png", BRANDS[1], COLORS[0], SIZES[1], "fashion", 38, 5,
  "Doraemon ngồi thư giãn giữa núi mây.", 20),

createProduct(42, "Tranh 'Pokémon Đại Chiến Nhật Cổ'", 259000, "/IMAGES/42.png", BRANDS[2], COLORS[1], SIZES[2], "accessories", 21, 3,
  "Pikachu và Eevee giao đấu, Squirtle và Charmander tung chiêu.", 0),

createProduct(43, "Tranh 'Phẫn Nộ Hoa Y'", 199000, "/IMAGES/43.png", BRANDS[0], COLORS[2], SIZES[3], "fashion", 57, 4,
  "Hai thiếu nữ kimono hoa rực rỡ, một người chỉ tay giận dữ.", 30),

createProduct(44, "Tranh 'Mèo Trắng Thư Giãn'", 299000, "/IMAGES/44.png", BRANDS[1], COLORS[3], SIZES[0], "fashion", 0, 5,
  "Mèo trắng thư giãn có ngồi trước đĩa rau.", 0),

createProduct(45, "Tranh 'Mèo Trắng Vương Giả'", 259000, "/IMAGES/45.jpg", BRANDS[2], COLORS[4], SIZES[1], "accessories", 49, 2,
  "Mèo trắng nằm kiêu hãnh trên đệm hoa.", 20),

createProduct(46, "Tranh 'Mãnh Hổ Hạ Sơn'", 199000, "/IMAGES/46.jpg", BRANDS[0], COLORS[0], SIZES[2], "fashion", 32, 4,
  "Hổ vàng treo mình trên dây giữa hai vách núi.", 0),

createProduct(47, "Tranh 'Long Hồn Quả Vương'", 299000, "/IMAGES/47.png", BRANDS[1], COLORS[1], SIZES[3], "fashion", 71, 5,
  "Ronaldo cầm bóng, khung rồng tôn vinh khí chất vương giả.", 30),

createProduct(48, "Tranh 'Lấy Đức Phục Nhân'", 259000, "/IMAGES/48.webp", BRANDS[2], COLORS[2], SIZES[0], "accessories", 26, 3,
  "Vị quân vương áo đỏ cầm súng hiện đại, đứng giữa vách đá.", 20),

createProduct(49, "Tranh 'Ba Lần Đánh Bạch Cốt Tinh'", 199000, "/IMAGES/49.jpg", BRANDS[0], COLORS[3], SIZES[1], "fashion", 0, 4,
  "Năm nhân vật huyền thoại chơi bài trên mỏm núi.", 0),

createProduct(50, "Tranh 'Mr Gold'", 299000, "/IMAGES/50..png", BRANDS[1], COLORS[4], SIZES[2], "fashion", 21, 5,
  "Quý ngài mr gold.", 40),
];

