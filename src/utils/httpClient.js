// const overLoad = document.querySelector(".over-loading");
const getTokenStorage = (name) => {
    const tokens = JSON.parse(localStorage.getItem(name));
    return tokens;
};
const setTokenStorage = (tokens) => {
    localStorage.setItem("access_token", JSON.stringify(tokens));
};

export const httpClient = {
    token: getTokenStorage("access_token") || null,
    baseUrl: null,
    refreshTokenPromise: null,
    send: async function (path, method = "GET", body = null, headers = {}) {
        let response = null;
        try {
            if (!this.baseUrl) {
                throw new Error("Vui lòng cập nhật baseUrl");
            }

            const url = this.baseUrl + path;
            const initialHeaders = { "Content-Type": "application/json" };
            Object.assign(initialHeaders, headers);
            if (this.token) {
                initialHeaders["Authorization"] = `Bearer ${this.token}`;
            }

            const options = {
                method,
                headers: initialHeaders,
                credentials: "include",
            };
            if (body) {
                options.body = JSON.stringify(body);
            }
            response = await fetch(url, options);

            const data = await response.json();

            if (
                (response.status === 401 &&
                    data.message === "Unauthorized or session expired") ||
                (response.status === 500 && data.errors === "jwt expired")
            ) {
                throw new Error(data.message);
            }

            return { response, data };
        } catch (e) {
            // Xử lý cấp lại accessToken khi hết hạn
            if (!this.refreshTokenPromise) {
                this.refreshTokenPromise = this.getRefreshToken();
            }
            const newToken = await this.refreshTokenPromise;

            if (!newToken) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                localStorage.removeItem("cart");
                // window.location.reload();
                console.log(response);

                return { response };
            } else {
                //Lưu vào Storage
                setTokenStorage(newToken);
                //Gọi lại request bị failed
                this.token = newToken;
                return await this.send(path, method, body, headers);
            }
        } finally {
            // overLoad.style.display = "none";
        }
    },
    getRefreshToken: async function () {
        try {
            const response = await fetch(
                `${this.baseUrl}/api/auth/refresh-token`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            if (!response.ok) {
                return false;
            }
            const { data: dataObj } = await response.json();

            const tokens = dataObj.accessToken;
            return tokens;
        } catch (e) {
            return false;
        }
    },
    get: function (url) {
        return this.send(url);
    },
    post: function (url, body, headers = {}) {
        return this.send(url, "POST", body, headers);
    },
    put: function (url, body, headers = {}) {
        return this.send(url, "PUT", body, headers);
    },
    patch: function (url, body, headers = {}) {
        return this.send(url, "PATCH", body, headers);
    },
    delete: function (url, headers = {}) {
        return this.send(url, "DELETE", null, headers);
    },
};
