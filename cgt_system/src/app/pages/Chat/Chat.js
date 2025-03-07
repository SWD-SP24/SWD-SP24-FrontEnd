import React from "react";
import "./chat.css";
import imgae from "../../assets/img/avatars/7.png";

export default function Chat() {
  return (
    <div class="app-chat card overflow-hidden">
      <div className="row g-0">
        {/* Chat & Contact */}
        <div
          class="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
          id="app-chat-contacts"
        >
          <div class="sidebar-header px-6 border-bottom d-flex align-items-center">
            <div class="d-flex align-items-center me-6 me-lg-0">
              <div
                class="flex-shrink-0 avatar avatar-online me-4"
                data-bs-toggle="sidebar"
                data-overlay="app-overlay-ex"
                data-target="#app-chat-sidebar-left"
              >
                <img
                  class="user-avatar rounded-circle cursor-pointer"
                  src={imgae}
                  alt="Avatar"
                />
              </div>
              <div class="flex-grow-1 input-group input-group-merge rounded-pill">
                <span class="input-group-text" id="basic-addon-search31">
                  <i class="icon-base bx bx-search icon-sm"></i>
                </span>
                <input
                  type="text"
                  class="form-control chat-search-input"
                  placeholder="Search..."
                  aria-label="Search..."
                  aria-describedby="basic-addon-search31"
                />
              </div>
            </div>
            <i
              class="icon-base bx bx-x icon-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
              data-overlay=""
              data-bs-toggle="sidebar"
              data-target="#app-chat-contacts"
            ></i>
          </div>
          <div className="sidebar-body ps ps--active-y overflow-auto">
            <ul
              class="list-unstyled chat-contact-list py-2 mb-0"
              id="chat-list"
            >
              <li class="chat-contact-list-item chat-contact-list-item-title mt-0">
                <h5 class="text-primary mb-0">Chats</h5>
              </li>
              <li class="chat-contact-list-item chat-list-item-0 d-none">
                <h6 class="text-body-secondary mb-0">No Chats Found</h6>
              </li>
              <li class="chat-contact-list-item mb-1">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar avatar-online">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                        Waldemar Mannering
                      </h6>
                      <small class="chat-contact-list-item-time">
                        5 Minutes
                      </small>
                    </div>
                    <small class="chat-contact-status text-truncate">
                      Refer friends. Get rewards.
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item mb-1">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar avatar-offline">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="chat-contact-name text-truncate fw-normal m-0">
                        Felecia Rower
                      </h6>
                      <small class="chat-contact-list-item-time">
                        30 Minutes
                      </small>
                    </div>
                    <small class="chat-contact-status text-truncate">
                      I will purchase it for sure. 👍
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item mb-0">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar avatar-busy">
                    <span class="avatar-initial rounded-circle bg-label-success">
                      CM
                    </span>
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="chat-contact-name text-truncate fw-normal m-0">
                        Calvin Moore
                      </h6>
                      <small class="chat-contact-list-item-time">1 Day</small>
                    </div>
                    <small class="chat-contact-status text-truncate">
                      If it takes long you can mail inbox user
                    </small>
                  </div>
                </a>
              </li>
            </ul>

            <ul
              class="list-unstyled chat-contact-list mb-0 py-2"
              id="contact-list"
            >
              <li class="chat-contact-list-item chat-contact-list-item-title mt-0">
                <h5 class="text-primary mb-0">Contacts</h5>
              </li>
              <li class="chat-contact-list-item contact-list-item-0 d-none">
                <h6 class="text-body-secondary mb-0">No Contacts Found</h6>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Natalie Maxwell
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      UI/UX Designer
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Jess Cook
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Business Analyst
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="avatar d-block flex-shrink-0">
                    <span class="avatar-initial rounded-circle bg-label-primary">
                      LM
                    </span>
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Louie Mason
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Resource Manager
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Krystal Norton
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Business Executive
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Stacy Garrison
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Marketing Ninja
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="avatar d-block flex-shrink-0">
                    <span class="avatar-initial rounded-circle bg-label-success">
                      CM
                    </span>
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Calvin Moore
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      UX Engineer
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Mary Giles
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Account Department
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Waldemar Mannering
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      AWS Support
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="avatar d-block flex-shrink-0">
                    <span class="avatar-initial rounded-circle bg-label-danger">
                      AJ
                    </span>
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Amy Johnson
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Frontend Developer
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      Felecia Rower
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Cloud Engineer
                    </small>
                  </div>
                </a>
              </li>
              <li class="chat-contact-list-item mb-0">
                <a class="d-flex align-items-center">
                  <div class="flex-shrink-0 avatar">
                    <img src={imgae} alt="Avatar" class="rounded-circle" />
                  </div>
                  <div class="chat-contact-info flex-grow-1 ms-4">
                    <h6 class="chat-contact-name text-truncate m-0 fw-normal">
                      William Stephens
                    </h6>
                    <small class="chat-contact-status text-truncate">
                      Backend Developer
                    </small>
                  </div>
                </a>
              </li>
            </ul>
            <div class="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
              <div
                class="ps__thumb-x"
                tabindex="0"
                style={{ left: "0px", width: "0px" }}
              ></div>
            </div>
            <div
              class="ps__rail-y"
              style={{ top: "0px", height: "164px", right: "0px" }}
            >
              <div
                class="ps__thumb-y"
                tabindex="0"
                style={{ top: "0px", height: "26px" }}
              ></div>
            </div>
          </div>
        </div>
        {/* End Chat & Contact */}
        <div
          class="col app-chat-conversation d-flex align-items-center justify-content-center flex-column"
          id="app-chat-conversation"
        >
          <div class="bg-label-primary p-8 rounded-circle">
            <i class="icon-base bx bx-message-alt-detail icon-48px"></i>
          </div>
          <p class="my-4">Select a contact to start a conversation.</p>
          <button
            class="btn btn-primary app-chat-conversation-btn"
            id="app-chat-conversation-btn"
          >
            Select Contact
          </button>
        </div>
      </div>
    </div>
  );
}
