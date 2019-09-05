# Dockerfile for creating a statically-linked Rust application using Docker's
# multi-stage build feature.
# TODO: See if there's a way to clean up or cache this intermediary image,
# it's about 2.4 gigs on disk. 
FROM messense/rust-musl-cross:x86_64-musl AS build
ADD . .
RUN cargo build --release && \
    cargo install --target=x86_64-unknown-linux-musl --path .

FROM alpine:3.10
LABEL maintainer="Eric Hopkins <eric.on.tech@gmail.com>"
COPY --from=build /root/.cargo/bin/names_db .
CMD ["./names_db"]
