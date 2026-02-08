const About = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Về chúng tôi
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8">
            Nghệ Thuật Của Hương Thơm
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Chúng tôi tự hào mang đến cho bạn những chai nước hoa cao cấp nhất, 
            được tuyển chọn từ các thương hiệu nổi tiếng thế giới. Mỗi mùi hương 
            là một câu chuyện, một trải nghiệm độc đáo mà bạn xứng đáng được sở hữu.
          </p>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Chính Hãng 100%</h3>
              <p className="text-muted-foreground text-sm">
                Cam kết sản phẩm chính hãng, nguồn gốc rõ ràng
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Giao Hàng Toàn Quốc</h3>
              <p className="text-muted-foreground text-sm">
                Đóng gói cẩn thận, giao hàng nhanh chóng
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-primary rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-serif text-xl mb-2">Tư Vấn Miễn Phí</h3>
              <p className="text-muted-foreground text-sm">
                Đội ngũ tư vấn chuyên nghiệp, nhiệt tình
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
